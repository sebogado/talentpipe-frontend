import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './technical-skill.reducer';
import { ITechnicalSkill } from 'app/shared/model/technical-skill.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITechnicalSkillDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TechnicalSkillDetail extends React.Component<ITechnicalSkillDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { technicalSkillEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentpipeApp.technicalSkill.detail.title">TechnicalSkill</Translate> [<b>{technicalSkillEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentpipeApp.technicalSkill.name">Name</Translate>
              </span>
            </dt>
            <dd>{technicalSkillEntity.name}</dd>
            <dt>
              <span id="normalizedName">
                <Translate contentKey="talentpipeApp.technicalSkill.normalizedName">Normalized Name</Translate>
              </span>
            </dt>
            <dd>{technicalSkillEntity.normalizedName}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="talentpipeApp.technicalSkill.description">Description</Translate>
              </span>
            </dt>
            <dd>{technicalSkillEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/technical-skill" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/technical-skill/${technicalSkillEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ technicalSkill }: IRootState) => ({
  technicalSkillEntity: technicalSkill.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TechnicalSkillDetail);
